package com.example.indianBites.models;

import java.time.Instant;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;


@Data
@Entity
public class User {
	
	@Id
	private long id;
	private String name;
	private String email;
	private String Role;
	private String phone;
	private String password;
	
	@CreatedDate
	private Instant createdAt;
	
	@LastModifiedDate
	private Instant updatedAt;
	
	@OneToOne(cascade = {CascadeType.ALL})
	private Address address;
	
	@OneToMany(mappedBy = "user" ,cascade = {CascadeType.ALL} ,orphanRemoval = true )
	private List<Orders> orders;

}
