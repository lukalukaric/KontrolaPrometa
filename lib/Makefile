all: lib build

build: 
	gcc -o projekt.o -c main.c 
	gcc -o projekt projekt.o -lPROJEKT -L. -Wl,-rpath,.
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
