package com.example.library.management.System.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.library.management.System.model.Library;
public interface LibraryRepository extends JpaRepository<Library,Integer> {
}
