$(function(){
    //list products
    $.ajax({
        method:'GET',
        url: 'products',
        success: function(products){
            //clear the list
            $("#productList").empty();

            //parse the data
            $.each(products, function(i, product){
                $("#productList").append(
                    '<div class="col-lg-3 col-md-6 mb-4">'+
                        '<div class="card h-100 pb-0">' +
                            '<a href="products/' + product._id + '" class="card-link text-dark">' +
                                '<img class="card-img-top" src="images/' + product.image + '">' +
                            '</a>' +
                            '<div class="card-body text-left">'+
                                '<a href="products/' + product._id + '" class="card-link text-dark"><h5 class="card-title text-truncate">'+ product.productName + '</h5>' +
                                '<p class="card-text truncate">'+ product.description + '</p>' +
                                '<p class="card-text text-right font-weight-bold float-right mb-0"> $'+ product.productPrice + '</p></a>' +
                                '<p class="float-left mb-0"><i class="far fa-heart text-danger"></i></p>' +        
                            '</div>' +
                            '<div class="card-footer">' +
                                '<a href="#" class="btn btn-warning"><i class="fas fa-shopping-cart mr-2"></i>Add</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
                );
            });

            // color the heart when hover on it
            $("#productList").on("mouseover", "i.fa-heart", function(){
                $(this).toggleClass("fas");
            });
            $("#productList").on("mouseleave", "i.fa-heart", function(){
                $(this).toggleClass("fas");
                
            });
            
            // click the heart to toggle color.
            $("#productList").on("click", "i.fa-heart", function(){
                $(this).toggleClass("fas");
            });

        },
        error: function(){
            alert("Error loading products");
        }
    });    
});

