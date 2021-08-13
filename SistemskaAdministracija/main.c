#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <arpa/inet.h>
#include <math.h>
#include "libPROJEKT.h"


int main(int argc, char **argv)
{


	int port = atoi(argv[3]);
	printf("%d",  port);
	int e;
	int sockfd;
	struct sockaddr_in server_addr;
	FILE *fp;
	char *filename = argv[1];
       //Ustvarimo socket, uporabimo TCP, Ipv4 PROTOKOL
	sockfd = socket(AF_INET, SOCK_STREAM, 0);
	if(sockfd < 0) {
		perror("[-]Error in socket");
		exit(1);
	}
	printf("[+]Server socket created successfully.\n");

	server_addr.sin_family = AF_INET;
	server_addr.sin_port = port;

	if(strcmp(argv[2],"localhost") == 0){
		printf("Localhost\n");
	server_addr.sin_addr.s_addr = inet_addr("127.0.0.1");
	}else{
		printf("Any host");
		server_addr.sin_addr.s_addr = htonl(INADDR_ANY);
	}
	//Povezemo
	e = connect(sockfd, (struct sockaddr*)&server_addr, sizeof(server_addr));
	if(e == -1) {
		perror("[-]Error in socket");
		exit(1);
	}
	printf("[+]Connected to Server.\n");

  
	
	
	if (send(sockfd, filename, 1024, 0) == -1) {
	      perror("[-]Error in sending file name.");
	      exit(1);
	}
	send_file(fp, sockfd, filename);
	printf("[+]File data sent successfully.\n");


	
	if (send(sockfd, "koncaj", 1024, 0) == -1) {
		perror("[-]Error in sending !.");
		exit(1);
	}		 
	printf("Sem poslal zakljucujem");
	printf("[+]Closing the connection.\n");
	close(sockfd);

    return 0;
}
