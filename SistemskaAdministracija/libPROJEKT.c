#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>
#define SIZE 1024
void send_file(FILE *fp, int sockfd, char* filename){
	 fp = fopen(filename, "rb");
	printf("\nPosiljam filename: %s\n", filename);

	fseek(fp, 0L, SEEK_END);
	int sz = ftell(fp);
	printf("%d", sz);
	printf("%s", fp);
	char dolzina[1024];
	sprintf(dolzina, "%d", sz);
	if (send(sockfd, dolzina, 1024, 0) == -1) {
			perror("[-]Error in sending file.");
			exit(1);
	}
	rewind(fp);

	double forloop = floor(sz/1024);
	int ostanek = sz - ((int)forloop*1024);
	printf("\nOstanke: %d\n", ostanek);
	printf("double: %lf", forloop);
	unsigned char bufferOstanek[ostanek];
	unsigned char buffer[1024];
	while(1){
		if(forloop == 0){
			fread(bufferOstanek, 1, ostanek, fp);
			if (send(sockfd, bufferOstanek, ostanek, 0) == -1) {
		      		perror("[-]Error in sending file name.");
		      		exit(1);
			}
			break;
		}
		fread(buffer, 1, 1024, fp);
		if (send(sockfd, buffer, 1024, 0) == -1) {
			perror("[-]Error in sending file.");
			exit(1);
		}
		bzero(buffer, SIZE);
		forloop--;
	}
	bzero(buffer, SIZE);
	fclose(fp);
}
