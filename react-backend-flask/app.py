from urllib import response
from flask import Flask, Response, request
from connection import psqlConnection

app = Flask(__name__)

db = psqlConnection()

@app.route('/this_is_a_test')
def howdy():
    return "Howdy from Flask's Backend App!"

@app.route('/order')
def getMenu():
    db.connect()
    menuItems = db.createQuery("SELECT * FROM menu;") #Get items from the database
    menuItems.sort(key=lambda x: x[0]) #Sort items by menu_id
    db.disconnect()
    return menuItems

@app.route('/cart/send_to_cart', methods=['POST'])
def sendToCart():
    if request.method == 'POST':
        frontEndItem = request.get_json()
        print(f"\nReceived {frontEndItem[1]} from frontend, sending to cart: menu_item_id: {frontEndItem[0]} || menu_item_cost: {frontEndItem[2]}\n")
        db.connect()
        db.createQuery(f"INSERT INTO cart (ingredients_id, ingredients_cost) VALUES ({frontEndItem[0]}, {frontEndItem[2]});")
        db.disconnect()
        return f"{frontEndItem[1]} has been added to the cart!"


@app.route('/cart/clear_cart', methods=['POST'])
def clearCart():
    if request.method == 'POST':
        # frontEndItem = request.get_json()
        print(f"\nReceived jackshit from frontend, sending to cart: BOMB. Yes a bomb. this is intentional\n")
        db.connect()
        db.createQuery(f"DELETE FROM cart;")
        db.disconnect()
        return f"Cart has been cleared!"

if __name__ == "__main__":
    app.run(port=5001,debug=True)