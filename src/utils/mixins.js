export const placeholderImageCreator = {
  filters: {
    placeholderImage(src) {
      if (src) return src;
      return "https://via.placeholder.com/500x500/d3d3d3?text=No+Image";
    }
  }
}