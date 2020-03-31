import { InputType, ArgsType, ObjectType, Field, ID, Int } from 'type-graphql'

@InputType()
class NewRecipeInput {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(type => [String])
  ingredients!: string[];
}

@ArgsType()
class RecipesArgs {
  @Field(type => Int)
  skip: number = 0;

  @Field(type => Int)
  take: number = 25;
}

@ObjectType()
class Recipe {
  @Field(type => ID, {description: 'ID'})
  id!: string;

  @Field({description: 'Title'})
  title!: string;

  @Field({ description: '描述', nullable: true })
  description?: string;

  @Field({description: '创建时间'})
  creationDate!: Date;

  @Field(type => [String], {description: '配料'})
  ingredients!: string[];
}

@ObjectType()
class User {
  @Field()
  name!: string
}

export { RecipesArgs, NewRecipeInput, User }

export default Recipe
