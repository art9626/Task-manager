module.exports = class UserDto {
  email;
  id;
  isActivated;

  constructor(model) {
    this.email = model.email;
    this.id = model._id; // к id Монго добавляет _ по дефолту
    this.isActivated = model.isActivated;
  }
}