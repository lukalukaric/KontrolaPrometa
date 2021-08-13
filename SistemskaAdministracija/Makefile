all: lib build

build: 
	gcc -o client.o -c main.c 
	gcc -o client client.o -lPROJEKT -L. -Wl,-rpath,/home/ziga/documents/
run:
	./projekt
clean:
	rm -f projekt
	rm -f libPROJEKT.so
	rm -f projekt.o
	rm -f libPROJEKT.o
lib:
	gcc -c libPROJEKT.c -o libPROJEKT.o
	gcc -shared -o libPROJEKT.so libPROJEKT.o
