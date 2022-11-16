package com.example.library.management.System.model;


import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="library")
public class Library {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "bookName")
    private String bookName;

    @Column(name = "authorName")
    private String authorName;
    @Column(name = "rating")
    private int rating;


    public Library(){

    }
    public Library(String bookName, String authorName, int rating) {
        this.bookName = bookName;
        this.authorName = authorName;
        this.rating = rating;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
