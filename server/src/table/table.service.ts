import { HttpException, Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Table } from './entities/table.entity';
import { Model } from 'mongoose';
import { log } from 'console';

@Injectable()
export class TableService {


  constructor(
    @InjectModel(Table.name) private readonly tableModel: Model<Table>,
  ) { }
  // create a new table
  async create(createTableDto: CreateTableDto) {
    try {
      const createdTable = new this.tableModel({
        ...createTableDto,
        reservationId: null,
      });
      return await createdTable.save();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  // get all tables
  async findAll() {
    try {
      const tables = await this.tableModel.find().exec();
      return tables;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  // get table by id
  async findOne(id: string) {
    try {
      const table = await this.tableModel.findOne({ tableId: id }).exec();

      return table;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  //  get table by name
  async getByName(name: string) {
    try {
      log('name', name)
      const table = await this.tableModel.find({ name: name }).exec();
      return table;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  // get table by location
  async getByLocation(id: string) {
    try {
      log('id', id)
      const tables = await this.tableModel.find({ locationId: id }).exec();
      return tables;
    } catch (error) {
      return []
    }
  }
  // update table
  async update(id: string, updateTableDto: UpdateTableDto): Promise<Table> {
    try {
      const updatedTable = await this.tableModel.findOneAndUpdate(
        { tableId: id },
        { ...updateTableDto },
        { new: true }
      );
      return updatedTable;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  // update table status
  async updateStatus(id: string, status: boolean): Promise<Table> {
    try {
      const updatedTable = await this.tableModel.findOneAndUpdate(
        { tableId: id },
        { status: status, reservationId: null },
        { new: true },
      );
      return updatedTable;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  // delete table
  async remove(id: string) {
    try {
      const deletedTable = await this.tableModel.findOneAndDelete({ tableId: id });
      return deletedTable;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }


}
