package com.example.library.management.System.controller;

        import com.example.library.management.System.exception.ResourceNotFoundException;
        import com.example.library.management.System.model.Borrow;
        import com.example.library.management.System.repository.BorrowRepository;
        import com.example.library.management.System.repository.LibraryRepository;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;
        import org.springframework.web.bind.annotation.*;
        import com.example.library.management.System.model.Library;
        import java.util.List;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1")
public class LibraryController {
            @Autowired
            private LibraryRepository libraryRepository;

            @Autowired
            private BorrowRepository borrowRepository;

            // get all details
            @GetMapping("/library")
            public List<Library> getAllBooks() {
                return libraryRepository.findAll();
            }

            @GetMapping("/library/borrow")
            public List<Borrow> getAllBorrows() {
                return borrowRepository.findAll();
            }

            @GetMapping("/library/borrow/{id}")
            public ResponseEntity<Borrow> getBorrowById(@PathVariable int id){
                Borrow borrow=borrowRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Not exist with id"+id));
                return ResponseEntity.ok(borrow);
            }
            @DeleteMapping("/library/borrow/{id}")
            public ResponseEntity<HttpStatus> deleteBorrow(@PathVariable int id){
                Borrow borrow=borrowRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Not exist with id"+id));
                borrowRepository.delete(borrow);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }


            @PostMapping("/library")
            public Library createLibrary(@RequestBody Library library){
                return libraryRepository.save(library);
            }

            @PostMapping("/library/borrow")
            public Borrow borrowLibrary(@RequestBody Borrow borrow){
                return borrowRepository.save(borrow);
            }

            @GetMapping("/library/{id}")
            public ResponseEntity<Library> getLibraryById(@PathVariable int id){
                Library library=libraryRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Not exist with id"+id));
                return ResponseEntity.ok(library);
            }

            @PutMapping("/library/{id}")
            public ResponseEntity<Library> updateLibrary(@PathVariable int id,@RequestBody Library libraryDetails){
                Library updateLibrary=libraryRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Not exist with id"+id));
                updateLibrary.setBookName(libraryDetails.getBookName());
                updateLibrary.setAuthorName(libraryDetails.getAuthorName());
                updateLibrary.setRating(libraryDetails.getRating());

                libraryRepository.save(updateLibrary);
                return ResponseEntity.ok(updateLibrary);
            }

            @DeleteMapping("/library/{id}")
            public ResponseEntity<HttpStatus> deleteLibrary(@PathVariable int id){

                Library library=libraryRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Not exist with id"+id));
                libraryRepository.delete(library);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }
