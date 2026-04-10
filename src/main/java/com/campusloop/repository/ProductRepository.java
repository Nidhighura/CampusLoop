package com.campusloop.repository;

import com.campusloop.model.Product;
import com.campusloop.model.ProductCategory;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findBySellerId(Long sellerId);

    Page<Product> findBySellerId(Long sellerId, Pageable pageable);

    @Query("""
            select p from Product p
            where (:category is null or p.category = :category)
              and (:search is null or lower(p.title) like lower(concat('%', :search, '%'))
                or lower(p.description) like lower(concat('%', :search, '%')))
            """)
    Page<Product> searchProducts(
            @Param("search") String search,
            @Param("category") ProductCategory category,
            Pageable pageable);
}
