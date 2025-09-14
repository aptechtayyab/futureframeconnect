
export const getBookmarks = () => {
    const stored = localStorage.getItem("bookmarkedEvents");
    return stored ? JSON.parse(stored) : [];
  };
  
  export const toggleBookmark = (event) => {
    let bookmarks = getBookmarks();
    const exists = bookmarks.find((e) => e.id === event.id);
  
    if (exists) {
      bookmarks = bookmarks.filter((e) => e.id !== event.id);
    } else {
      bookmarks.push(event);
    }
  
    localStorage.setItem("bookmarkedEvents", JSON.stringify(bookmarks));
    return bookmarks;
  };
  
  export const isBookmarked = (id) => {
    const bookmarks = getBookmarks();
    return bookmarks.some((e) => e.id === id);
  };
  