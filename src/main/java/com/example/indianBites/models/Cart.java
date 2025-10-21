package com.example.indianBites.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;


@Data
@Entity
public class Cart {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@ManyToOne()
	@JoinColumn(name="user_id")
	private User user;
	
    @ManyToOne
    @JoinColumn(name="food_item_id")
    private FoodItems foodItems;
    
    private int quantity;

}
