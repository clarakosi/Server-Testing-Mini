const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");

const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");

const server = require("./server");

const Band = require("./models");

describe("Bands", () => {
  describe("getBandName", () => {
    it("should return the expected band name", () => {
      const band = new Band({
        name: "Linkin Park",
        genre: "Alt-Rock"
      });
      expect(band.getBandName()).to.equal("Linkin Park");
    });
  });
  describe("getAllBands", () => {
    it("should return all the bands", () => {
      sinon.stub(Band, "find");
      Band.find.yields(null, [
        { name: "Linkin Park", genre: "Alt-Rock" },
        { name: "My Chemical Romance", genre: "Emo-Rock" }
      ]);
      Band.getAllBands(bands => {
        expect(bands.length).to.equal(2);
        expect(bands[1].name).to.equal("My Chemical Romance");
        Band.find.restore();
      });
    });
  });
});
