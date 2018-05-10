
$(document).ready(function(){
    $('.link-gallery').click(function(){
        var galleryId = $(this).attr('data-target');
        var currentLinkIndex = $(this).index('a[data-target="'+ galleryId +'"]');

        createGallery(galleryId, currentLinkIndex);
        createPagination(galleryId, currentLinkIndex);

        $(galleryId).on('hidden.bs.modal', function (){
            destroyGallry(galleryId);
            destroyPagination(galleryId);
        });

        $(galleryId +' .carousel').on('slid.bs.carousel', function (){
            var currentSlide = $(galleryId +' .carousel .item.active');
            var currentSlideIndex = currentSlide.index(galleryId +' .carousel .item');

            setTitle(galleryId, currentSlideIndex);
            setPagination(++currentSlideIndex, true);
        })
    });

    function createGallery(galleryId, currentSlideIndex){
        var galleryBox = $(galleryId + ' .carousel-inner');

        $('a[data-target="'+ galleryId +'"]').each(function(){
            var img = $(this).html();
            var galleryItem = $('<div class="item">'+ img +'</div>');

            galleryItem.appendTo(galleryBox);
        });

        galleryBox.children('.item').eq(currentSlideIndex).addClass('active');
        setTitle(galleryId, currentSlideIndex);
    }

    function destroyGallry(galleryId){
        $(galleryId + ' .carousel-inner').html("");
    }

    function createPagination(galleryId, currentSlideIndex){
        var pagination = $(galleryId + ' .pagination');
        var carouselId = $(galleryId).find('.carousel').attr('id');
        var prevLink = $('<li><a href="#'+ carouselId +'" data-slide="prev">«</a></li>');
        var nextLink = $('<li><a href="#'+ carouselId +'" data-slide="next">»</a></li>');

        prevLink.appendTo(pagination);
        nextLink.appendTo(pagination);

        $('a[data-target="'+ galleryId +'"]').each(function(){
            var linkIndex = $(this).index('a[data-target="'+ galleryId +'"]');
            var paginationLink = $('<li><a data-target="#carouselGallery" data-slide-to="'+ linkIndex +'">'+ (linkIndex+1) +'</a></li>');

            paginationLink.insertBefore('.pagination li:last-child');
        });

        setPagination(++currentSlideIndex);
    }

    function setPagination(currentSlideIndex, reset = false){
        if (reset){
            $('.pagination li').removeClass('active');
        }

        $('.pagination li').eq(currentSlideIndex).addClass('active');
    }

    function destroyPagination(galleryId){
        $(galleryId + ' .pagination').html("");
    }

    function setTitle(galleryId, currentSlideIndex){
        var imgAlt = $(galleryId + ' .item').eq(currentSlideIndex).find('img').attr('alt');

        $('.modal-title').text(imgAlt);
    }
});
