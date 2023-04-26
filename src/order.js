import React, { useState, useEffect } from 'react';
import './App.css';
import menuLambGyro from './images/lambBowlTwo.png';
import menuLambBowl from './images/ActualLambBowl.png';
import menuChickenGyro from './images/chickenGyro.png';
import menuChickenBowl from './images/chickenBowl.png';
import menuPitaBread from './images/pitaBread.png';
import menuSoda from './images/drinkCup.png';
import menuFalafels from './images/falafels2.png';

function Order() {
  const [menuData, setMenuData] = useState();
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    fetch('/order')
      .then((res) => res.json())
      .then((menuData) => {
        setMenuData(menuData);
        console.log(menuData);
      });
  }, []);


  function findMenuItem(){
    if (activeModal === 1) {
      return menuData[7];
    } // Lamb Gyro
    else if (activeModal === 2) {
      return menuData[8];
    } // Lamb Bowl
    else if (activeModal === 3) {
      return menuData[0];
    } // Chicken Gyro
    else if (activeModal === 4) {
      return menuData[1];
    } // Chicken Bowl
    else if (activeModal === 5) {
      return menuData[2];
    } // Hummas and Pita
    else if (activeModal === 6) {
      return menuData[6];
    } // Fountian Drink
    else if (activeModal === 7) {
      return menuData[3];
    } // 2 Falafel
    else {
      return menuData[18];
    }
  }

  const handleATOClick = () => {
    const sendBack = findMenuItem() // Find menu item works
    fetch('/cart/send_to_cart', {
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendBack),
    })
    .then(responce => {
      console.log(responce)
    })
    .catch(error => console.log(error));
  };

  const handleClearClick = () => {
    fetch('/cart/clear_cart', {
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({null:null}),
    })
    .then(responce => {
      console.log(responce)
    })
    .catch(error => console.log(error));
  };

  const showModal = (modalNumber) => {
    setActiveModal(modalNumber);
  };

  const closeModal = (e) => {
    if (e.target.className === 'modal') {
      setActiveModal(null);
    }
  };

  return (
    <div>
      <button className="menuNow-button button-hover-effect">Menu</button>
      <img
        src={menuLambGyro}
        className="menu-Food-One"
        alt="your alt text"
        onClick={() => showModal(1)}
      />

      <img
        src={menuLambBowl}
        className="menu-Food-Two"
        alt="your alt text"
        onClick={() => showModal(2)}
      />

      <img
        src={menuChickenGyro}
        className="menu-Food-Three"
        alt="your alt text"
        onClick={() => showModal(3)}
      />

      <img
        src={menuChickenBowl}
        className="menu-Food-Four"
        alt="your alt text"
        onClick={() => showModal(4)}
      />

      <img
        src={menuPitaBread}
        className="menu-Food-Five"
        alt="your alt text"
        onClick={() => showModal(5)}
      />

      <img
        src={menuSoda}
        className="menu-Drink"
        alt="your alt text"
        onClick={() => showModal(6)}
      />

      <img
        src={menuFalafels}
        className="menu-Food-Six"
        alt="your alt text"
        onClick={() => showModal(7)}
      />
      
      <button onClick={handleClearClick}>Clear Cart</button>

      {activeModal === 1 && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <h2>Lamb Gyro</h2>
            <p>Description: A lamb gyro is a popular Greek dish made with tender, marinated strips of lamb that are layered on a warm pita bread along with fresh lettuce, sliced tomatoes, and crunchy cucumbers. The gyro is can be drizzled with a tangy tzatziki sauce made from yogurt, garlic, and cucumbers, and can also be accompanied by sides such as fragrant rice, creamy hummus, and crisp salad greens.</p>
            <button onClick={handleATOClick}>Order Now!</button>
          </div>
        </div>
      )}

      {activeModal === 2 && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <h2>Lamb Bowl</h2>
            <p>Description: The lamb bowl is a hearty and satisfying meal that features tender, marinated lamb served over a bed of fragrant rice and accompanied by fresh vegetables such as roasted carrots, Brussels sprouts, and kale. The dish is can be served with a flavorful sauce made from yogurt, garlic, and herbs, and can be customized with additional toppings such as crumbled feta cheese, olives, or sliced almonds.</p>
            <button onClick={handleATOClick}>Order Now!</button>
          </div>
        </div>
      )}

      {activeModal === 3 && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <h2>Chicken Gyro</h2>
            <p>Description: Indulge in the flavors of Greece with our delicious chicken gyro! Tender strips of marinated chicken are grilled to perfection and wrapped in a warm pita bread, then topped with fresh lettuce, sliced tomatoes, and crunchy cucumbers. Customizable with your choice of sauces, such as tangy tzatziki, zesty lemon garlic, or spicy harissa, our chicken gyro is a savory and wholesome option that's sure to satisfy your cravings. Served with sides like fragrant rice, creamy hummus, and crisp salad greens.</p>
            <button onClick={handleATOClick}>Order Now!</button>
          </div>
        </div>
      )}

      {activeModal === 4 && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <h2>Chicken Bowl</h2>
            <p>Description: A chicken bowl is a delicious and nutritious dish that typically consists of grilled chicken served over a bed of rice and accompanied by fresh veggies such as lettuce, tomatoes, and cucumbers. The bowl can be customized with a variety of sauces, such as tangy teriyaki, zesty lemon garlic, or spicy chipotle, depending on your personal taste preferences. With its wholesome ingredients and bold flavors, a chicken bowl is a satisfying and filling meal that's perfect for lunch or dinner.</p>
            <button onClick={handleATOClick}>Order Now!</button>
          </div>
        </div>
      )}

      {activeModal === 5 && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <h2>Pita Bread</h2>
            <p>Description: Warm triangle pieces of pita bread with hummus is a delicious and popular Middle Eastern appetizer. The pita bread is cut into triangles, brushed with melted butter, and toasted until warm and crispy. Served alongside a bowl of smooth and creamy hummus, the warm pita triangles are perfect for dipping and scooping up the flavorful dip. This tasty and satisfying snack is a great way to start any meal, and is sure to please both hummus lovers and newcomers alike.</p>
            <button onClick={handleATOClick}>Order Now!</button>
          </div>
        </div>
      )}

      {activeModal === 6 && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <h2>Soda Cup</h2>
            <p>Description: Our soda cups feature a selection of Pepsi brand drinks, including Pepsi, Diet Pepsi, Mountain Dew, Sierra Mist, and other popular flavors. Simply grab a cup and head over to the soda fountain to mix and match your favorite drinks and create your own custom blend. With endless possibilities, our soda cups are perfect for satisfying your thirst and getting the perfect drink to complement your meal.</p>
            <button onClick={handleATOClick}>Order Now!</button>
          </div>
        </div>
      )}

      {activeModal === 7 && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <h2>Falafels</h2>
            <p>Description: A vegetarian classic! Made with ground chickpeas and a blend of spices, our falafels are expertly crafted to be crispy on the outside and tender on the inside. These delightful balls of flavor can be enjoyed on their own or as a part of a larger meal. Perfect for a quick snack or a satisfying lunch, our falafels are a popular choice for vegetarians and meat-eaters alike.</p>
            <button onClick={handleATOClick}>Order Now!</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Order;
