package com.example.indianBites.models;

import java.time.Instant;

import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Orders {
	
	
	
	 @Id 
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
     private long id;

     @ManyToOne
     @JoinColumn(name="user_id")
     private User user;
     
     @OneToMany(mappedBy = "orders" , cascade = {CascadeType.ALL})
     private List<OrderItems> orderItems;

     private Double totalAmount;
     
     private String status; // pending / confirmed / delivered
     
     @CreatedDate
 	 private Instant createdAt;
     
     @LastModifiedDate
 	 private Instant updatedAt;

}
