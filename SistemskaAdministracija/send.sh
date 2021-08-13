#!/bin/bash
mongodump --forceTableScan --uri mongodb+srv://Ziga:123@kontrolaprometa.y3yve.mongodb.net/KontrolaPrometa --out bazapodatkov
tar -cvzf bazarezerva.tar.gz bazapodatkov

./client bazarezerva.tar.gz localhost 3005
