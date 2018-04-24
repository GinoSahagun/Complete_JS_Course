import axios from "axios";
import { key, proxy } from "../config";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(
        `${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`
      );
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (err) {
      console.log(err);
    }
  }

  calcTime() {
    // Assuming that we need 15 minutes per 3 ingredients
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }
  calcServing() {
    this.serving = 4;
  }
  parseIngredients() {
    const unitsLong = [
      "tablespoons",
      "tablespoon",
      "ounce",
      "ounces",
      "teaspoons",
      "teaspoon",
      "cups",
      "pounds"
    ];
    const unitsShort = ["tbsp", "tbsp", "oz", "oz", "tsp", "tsp", "cup", "lbs"];
    const newIngredients = this.ingredients.map(data => {
      // 1) uniform units
      let ingredient = data.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });
      // 2) removes all partheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");
      const arrIng = ingredient.split(" ");
      const unitIndex = arrIng.findIndex(el2 => {
        unitsShort.include(el2);
      });

      if (unitIndex > -1) {
        const arrCount = arrIng.slice(0, unitIndex);
        let count;
        if (arrCount.length === 1){
          count = eval(arrIng[0].replace('-', '+'));
        }
        else{
          count = eval(arrIng.slice(0, unitIndex).join('+'));
        }
        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' ')
        }
      } else if (parseInt(arrIng[0], 10)) {
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')
        }
      } else if (unitIndex === -1) {

        objIng = {
          count: 1,
          unit: '',
          ingredient
        }
      }
      // 3) parse Ingredients into count, unit and ingredient

      return ingredient;
    });
    this.ingredients = newIngredients;
  }
}
