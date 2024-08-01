import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

@Resolver('User')
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
  ) {}

  @Query('user')
  async getUser(@Args('id') id: number) {
    return this.usersService.findOneById(id);
  }

  @ResolveField('posts')
  async getPosts(@Parent() user) {
    const { id } = user;
    return this.postsService.findAll({ userId: id });
  }
}
