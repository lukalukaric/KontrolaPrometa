#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <arpa/inet.h>
#include<netdb.h>
#include<netinet/in.h>
#include <time.h>

#define SIZE 1024

void write_jpg(int sockfd, char buffer[SIZE]){
    	FILE *fp;
	int n;
	time_t seconds = time(NULL);
	char * time_str = ctime(&seconds);
    	time_str[10] = '\0';
    	for(int i  = 0; i < strlen(time_str);i++){
    	if(time_str[i] == ' '){
    		time_str[i] = '_';
    	} 

    	}
    	printf("\n");
 	char *result = malloc(strlen(time_str) + strlen(buffer) + 2);
	char *space = "_";
    	strcpy(result, time_str);
    	strcat(result, space);
    	strcat(result, buffer);
	char *filename = result;
	fp = fopen(filename, "wb");
	bzero(buffer, SIZE);
	n = recv(sockfd, buffer, SIZE, 0);
	printf("%s",buffer);
	int sz = atoi(buffer);
	bzero(buffer, SIZE);
	double forloop = floor(sz/1024);
	int ostanek = sz - ((int)forloop*1024);
	printf("\nOstanke: %d\n", ostanek);
	printf("double: %lf", forloop);
	unsigned char bufferOstanek[ostanek];
	unsigned char bufferCeli[1024];
	while(1){
		if(forloop == 0){
			if (recv(sockfd, bufferOstanek, ostanek, 0) == -1) {
		      		perror("[-]Error in sending file name.");
		      		exit(1);
			}
			fwrite(bufferOstanek, ostanek, 1, fp);
			break;
		}
		if (recv(sockfd, bufferCeli, 1024, 0) == -1) {
			perror("[-]Error in sending file.");
			exit(1);
		}
		fwrite(bufferCeli,1024 ,1, fp);
		bzero(bufferCeli, SIZE);
		forloop--;
		
	}
	
	fclose(fp);
}


void write_file(int sockfd){
	int n;
	unsigned char buffer[SIZE];
	n = recv(sockfd, buffer, SIZE, 0);
	printf("\Sprejemam filename: %s\n", buffer);	
	
	write_jpg(sockfd, buffer);
	if(strcmp(buffer,"!") == 0){
		printf("zakljucujem v glavni");
	}
	printf("Buffer v glavni; %s", buffer);
	bzero(buffer, SIZE);
}

int main(int argc, char **argv){
  
	int port = atoi(argv[1]);
	int e;
	int sockfd, new_sock;
	//Inicializiramo sockaddr_in strukturo
	struct sockaddr_in server_addr, new_addr;
	socklen_t addr_size;
	char buffer[SIZE];
	//Ustvarimo socket
	sockfd = socket(AF_INET, SOCK_STREAM, 0);
	if(sockfd < 0) {
		perror("[-]Error in socket");
		exit(1);
	}
	printf("[+]Server socket created successfully.\n");
	//Dodamo port in in IPv4 protokol
	server_addr.sin_family = AF_INET;
	server_addr.sin_port = port;
	server_addr.sin_addr.s_addr = htonl(INADDR_ANY);
	//bindamo socket z ipjom
	e = bind(sockfd, (struct sockaddr*)&server_addr, sizeof(server_addr));
	if(e < 0) {
		perror("[-]Error in bind");
		exit(1);
	}
  	printf("[+]Binding successfull.\n");
	//Poslušamo na socketu
  	if(listen(sockfd, 10) == 0){
 		printf("[+]Listening....\n");
 	}else{
 		perror("[-]Error in listening");
    		exit(1);
 	}

	addr_size = sizeof(new_addr);
	//Sprejmemo povezavo
	new_sock = accept(sockfd, (struct sockaddr*)&new_addr, &addr_size);
	write_file(new_sock);
	printf("[+]Data written in the file successfully.\n");

  return 0;
}
    


