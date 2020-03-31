import axios from 'axios'
import { plainToClass } from 'class-transformer'

import Recipe, { NewRecipeInput, User } from 'model/recipe.type'

class RecipeService {
  async getOrderDetail (
    orderName: string,
    needNewTracking: number,
  ): Promise<Recipe | null> {
    let res: Recipe|null = await axios.post(`http://${this.host}${orderDetailGwUrl}`, {
      data: {
        orderName: orderName,
        needNewTracking,
      }
    })

    if (res) {
      return plainToClass(Recipe, res)
    } else {
      return null
    }
  }

  async findById (
    id: string,
  ): Promise<Recipe | null> {
    let res: Recipe|null = await axios.post(`http://${this.host}${orderDetailGwUrl}`, {
      data: {
        id,
      }
    })

    if (res) {
      return plainToClass(Recipe, res)
    } else {
      return null
    }
  }

  async findAll (
    skip: number,
    take: number,
  ): Promise<Recipe | null> {
    let res: Recipe|null = await axios.post(`http://${this.host}${orderDetailGwUrl}`, {
      data: {
        skip,
        take,
      }
    })

    if (res) {
      return plainToClass(Recipe, res)
    } else {
      return null
    }
  }

  async addNew (
    newRecipeData: NewRecipeInput,
    user: User,
  ): Promise<Recipe | null> {
    let res: Recipe|null = await axios.post(`http://${this.host}${orderDetailGwUrl}`, {
      data: {
        newRecipeData,
        user,
      }
    })

    if (res) {
      return plainToClass(Recipe, res)
    } else {
      return null
    }
  }

  async removeById (
    id: string,
  ): Promise<Recipe | null> {
    let res: Recipe|null = await axios.post(`http://${this.host}${orderDetailGwUrl}`, {
      data: {
        id,
      }
    })

    if (res) {
      return plainToClass(Recipe, res)
    } else {
      return null
    }
  }
}

export default RecipeService