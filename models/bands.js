const Band = require("./band");

class Bands {
  constructor() {
    this.bands = [];
  }

  addBand(band = new Band()) {
    this.bands.push(band);
  }

  getBands() {
    return this.bands;
  }

  deleteBand(id = "") {
    this.bands = this.bands.filter((band) => band.id !== id);
    return this.bands;
  }

  voteBand(id = "") {
    this.bands = this.bands.map((data) => {
      if (data.id === id) {
        data.votes++;
        return data;
      } else {
        return data;
      }
    });
  }
}

module.exports = Bands;
