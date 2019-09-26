import moment from "moment"

const placeholderImageCreator = {
  filters: {
    placeholderImage(src) {
      if (src) return src;
      return "https://via.placeholder.com/500x500/d3d3d3?text=No+Image";
    }
  }
}

const fromNowFilter = {
  filters: {
    fromNow(date) {
      if (!date) return;
      return moment(date).fromNow(true);
    }
  }
}

export { placeholderImageCreator, fromNowFilter }