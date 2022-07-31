"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileControllers = void 0;

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

var _showProfileService = require("../services/users/showProfileService");

var _updateProfileService = require("../services/users/updateProfileService");

class ProfileControllers {
  async listUser(req, res) {
    const messageService = _tsyringe.container.resolve(_showProfileService.ShowProfileService);

    const {
      id
    } = req.user;
    const products = await messageService.showProfile(id);
    return res.status(200).json(products);
  }

  async updateUser(req, res) {
    const messageService = _tsyringe.container.resolve(_updateProfileService.UpdateProfileService);

    const user_id = req.user.id;
    const {
      name,
      email,
      password,
      old_password
    } = req.body;
    const updateProduct = await messageService.updateProfile({
      user_id,
      name,
      email,
      password,
      old_password
    });
    return res.json((0, _classTransformer.instanceToInstance)(updateProduct));
  }

}

exports.ProfileControllers = ProfileControllers;