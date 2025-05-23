import { Controller, Get, Post, Param } from '@nestjs/common';

@Controller('artists')
export class ArtistsController {
  @Get()
  getAll() {
    return 'All Artists will be here';
  }
  @Get(':id')
  getOne(@Param('id') id: string) {
    return 'One Artist will be here by ID = ' + id;
  }
  @Post()
  create() {
    return 'Create Artist';
  }
}
