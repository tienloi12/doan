import { HttpException, Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private readonly locationModel: Model<Location>,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    try {
      const createdLocation = new this.locationModel(createLocationDto);
      return await createdLocation.save();
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async findAll() {
    try {
      const locations = await this.locationModel.find().exec();
      return locations;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }


  async findOne(id) {
    try{
      const location = await this.locationModel.findOne({locationId: id}).exec();
      return location;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    try{
      const updatedLocation = await this.locationModel.findOneAndUpdate(
        {categoryId: id},
        {...updateLocationDto},
        {new: true}
      );
      return updatedLocation;
  }
  catch(err) {
    throw new HttpException(err.message, err.status);
  }
}
  async remove(id: string) {
    try{
      const deletedCategory = await this.locationModel.findOneAndDelete({categoryId: id});
      return deletedCategory;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }
   
}