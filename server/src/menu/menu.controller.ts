import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiResponse } from '../types/api-response.type';
import { Menu } from '../entity/menu.entity';

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async create(@Body() createMenuDto: CreateMenuDto): Promise<ApiResponse<Menu>> {
    const menu = await this.menuService.create(createMenuDto);
    return {
      success: true,
      message: 'Menu created successfully',
      data: menu,
    };
  }

  @Get()
  async findAll(): Promise<ApiResponse<Menu[]>> {
    const menus = await this.menuService.findAll();
    return {
      success: true,
      message: 'Menus retrieved successfully',
      data: menus,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Menu>> {
    const menu = await this.menuService.findOne(id);
    return {
      success: true,
      message: 'Menu retrieved successfully',
      data: menu,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMenuDto: UpdateMenuDto,
  ): Promise<ApiResponse<Menu>> {
    const menu = await this.menuService.update(id, updateMenuDto);
    return {
      success: true,
      message: 'Menu updated successfully',
      data: menu,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<void>> {
    await this.menuService.remove(id);
    return {
      success: true,
      message: 'Menu deleted successfully',
    };
  }
}
