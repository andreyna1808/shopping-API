"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersControllers = void 0;

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

var _createUsers = require("../services/users/createUsers");

var _deleteUsers = require("../services/users/deleteUsers");

var _listUsers = require("../services/users/listUsers");

var _updateUserAvatar = require("../services/users/updateUserAvatar");

var _updateUsers = require("../services/users/updateUsers");

class UsersControllers {
  async list(req, res) {
    const messageService = _tsyringe.container.resolve(_listUsers.ListUsersService);

    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 15;
    const products = await messageService.list({
      page,
      limit
    });
    return res.status(200).json((0, _classTransformer.instanceToInstance)(products));
  }

  async listById(req, res) {
    const messageService = _tsyringe.container.resolve(_listUsers.ListUsersService);

    const {
      id
    } = req.params;
    const productById = await messageService.listById(id);
    return res.status(200).json((0, _classTransformer.instanceToInstance)(productById));
  }

  async create(req, res) {
    const messageService = _tsyringe.container.resolve(_createUsers.CreateUsersService);

    const {
      name,
      email,
      password
    } = req.body;
    const createProduct = await messageService.create({
      name,
      email,
      password
    });
    return res.status(201).json((0, _classTransformer.instanceToInstance)(createProduct));
  }

  async update(req, res) {
    const messageService = _tsyringe.container.resolve(_updateUsers.UpdateUsesService);

    const {
      name,
      email,
      password
    } = req.body;
    const {
      id
    } = req.params;
    const updateProduct = await messageService.update({
      id,
      name,
      email,
      password
    });
    return res.json((0, _classTransformer.instanceToInstance)(updateProduct));
  }

  async UpdateAvatar(req, res) {
    const updateAvatarService = _tsyringe.container.resolve(_updateUserAvatar.UpdateUserAvatarService);

    const updateAvatar = await updateAvatarService.updateAvatar({
      id: req.user.id,
      avatar: req.file.filename
    });
    return res.json(updateAvatar);
  }

  async delete(req, res) {
    const messageService = _tsyringe.container.resolve(_deleteUsers.DeleteUsersService);

    const {
      id
    } = req.params;
    await messageService.delete(id);
    return res.status(200).json({
      message: 'user removed successfully'
    });
  }

}

exports.UsersControllers = UsersControllers;