import sqlite3
import csv

def build_from_9003():
    con = sqlite3.connect("puppets.db")

    cur = con.cursor()

    create_table_sql = '''
    CREATE TABLE IF NOT EXISTS puppets (
        name TEXT,
        owner TEXT,
        UNIQUE(name, owner)
    );
    '''

    cur.execute(create_table_sql)

    with open("9003.csv", newline='', encoding='utf-8') as csvfile:
            reader = csv.reader(csvfile)
            tuples = [(row[0], row[1]) for row in reader]

    cur.executemany("INSERT OR IGNORE INTO puppets VALUES (?, ?)", tuples)
    con.commit()
    con.close()

build_from_9003()