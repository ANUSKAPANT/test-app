import psycopg2
from config import config

class psqlConnection:
    """Class used to speed up the process of connecting to the epsilon db. Has the ability to connect to the db w/ different credentials.
    """
    def __init__(self, user="dbAdmin") -> None:
        self.conn = None
        self.cur = None
        self.connect(user)

    def connect(self, user="dbAdmin"):
        """Used to connect to the DB. If it fails, an error will print"""
        try:
            cred = config(section=user) # Gain admin credentials
            
            print("\nConnecting to csce331315_epsilon...")
            self.conn = psycopg2.connect(**cred)
            print(f"PostgreSQL database version:")
            
            #Display DB Version
            dbV = self.createQuery("SELECT version()")
            print(dbV[0][0])
            print()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        
    
    def createQuery(self, query):
        """Used when executing a Query to the Database. Nice little wrapper to handle the cursor and retrieve information."""
        self.cur = self.conn.cursor()
        self.cur.execute(query)
        result = None
        if self.cur.description != None:
            result = self.cur.fetchall()
        self.conn.commit() # Makes sure the changes stick            
        self.cur.close()
        return result #Seems the result is a list of tuples
        
    def disconnect(self):
        """Used to disconnect from the db."""
        try:
            if self.cur is not None:
                self.cur.close()
                print("Cursor closed from csce315331_epsilon")
            if self.conn is not None:
                self.conn.close()
                print("Disconnected from csce315331_epsilon")
        except:
            print("Something went wrong in disconnecting to the db.")

if __name__ == '__main__':
    #Demo for using the class
    db = psqlConnection() # Making the class
    db.connect() #Connecting to the DB, things will print here
    
    result = db.createQuery("SELECT * from teammembers;") 
    #result is a list of tuples
    print(result) # long ugly list that displays the individual elements of the tuple
    #Should be printing the 'Adam;' Tuple.
    print(result[2])
    
    db.disconnect()