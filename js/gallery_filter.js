'use strict';

(function () {
  var HIDE_GALLERY_SECTION = 'img-filters--inactive';
  var ACTIVE_BTN = 'img-filters__button--active';

  var userPictureTemplate = document.querySelector('#picture').content.querySelector('a');

  var galleryFilterSection = document.querySelector('.img-filters');
  var galleryFilterForm = galleryFilterSection.querySelector('.img-filters__form');
  var galleryDefaultFilterBtn = galleryFilterSection.querySelector('.filter-default');
  var galleryRandomFilterBtn = galleryFilterSection.querySelector('.filter-random');
  var galleryDiscussedFilterBtn = galleryFilterSection.querySelector('.filter-discussed');


  function setFilterSection(loadedPhotoCollection) {
    var defaultPhotoCollection = loadedPhotoCollection;
    defaultPhotoCollection = loadedPhotoCollection;

    galleryFilterSection.classList.remove(HIDE_GALLERY_SECTION);
    galleryFilterForm.addEventListener('click', galleryFilterSectionClickHandler);
    galleryFilterForm.addEventListener('keydown', galleryFilterSectionKeydownHandler);

    window.galleryFilter.setFilterSection = {
      defaultPhotoCollection: defaultPhotoCollection,
    };
  }

  function galleryFilterSectionClickHandler(evt) {
    window.eventChecker.checkMouseEvent(evt, changeFilter);
  }

  function galleryFilterSectionKeydownHandler(evt) {
    window.eventChecker.checkEnterKeyEvent(evt, changeFilter);
  }

  function changeFilter(evt) {
    var target = evt.target;
    var selectionFilterType;
    var filterBtn;

    if (target.contains(galleryDefaultFilterBtn)) {
      selectionFilterType = window.filterMethods.FilterType.DEFAULT;
      filterBtn = galleryDefaultFilterBtn;

    } else if (target.contains(galleryRandomFilterBtn)) {
      selectionFilterType = window.filterMethods.FilterType.RANDOM;
      filterBtn = galleryRandomFilterBtn;

    } else if (target.contains(galleryDiscussedFilterBtn)) {
      selectionFilterType = window.filterMethods.FilterType.DESCEND;
      filterBtn = galleryDiscussedFilterBtn;
    }

    var defaultPhotoCollection = window.galleryFilter.setFilterSection.defaultPhotoCollection;
    setGalleryFilter(filterBtn, userPictureTemplate, defaultPhotoCollection, selectionFilterType);
  }

  function setGalleryFilter(btn, imgTemplate, imgsToFilter, filterType) {
    addActiveBtnIndicator(btn);
    var filteredPhotoCollection = window.filterMethods.getFilteredArray(imgsToFilter, filterType);
    window.gallery.renderGallery.renderFilteredCollection(imgTemplate, filteredPhotoCollection);
  }

  function addActiveBtnIndicator(btn) {
    var deleteActive = galleryFilterForm.querySelector('.' + ACTIVE_BTN);
    deleteActive.classList.remove(ACTIVE_BTN);
    btn.classList.add(ACTIVE_BTN);
  }

  window.galleryFilter = {
    setFilterSection: setFilterSection,
    changeFilter: changeFilter,
    userPictureTemplate: userPictureTemplate,
  };

})();
