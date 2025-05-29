enum RoleUser {
  "admin",
  "premium",
  "user",
}

interface IUser {
  nickname: string;
  email: string;
  role: RoleUser;
  login(): void;
  logout(): void;
}

abstract class User implements IUser {
  constructor(
    public nickname: string,
    public email: string,
    public role: RoleUser,
    private password: string
  ) {}

  login(): void {
    console.log(`${this.nickname} ha iniciado sesion.`);
  }

  logout(): void {
    console.log(`${this.nickname} ha cerrado sesion.`);
  }

  public getAllInfo() {
    return `nickname:${this.nickname}\nrole:${this.role}\nemail:${this.email}`;
  }

  protected getEmail() {
    return this.email;
  }

  private checkPassword(password: string): boolean {
    return this.password === password;
  }

  public authenticate(password: string): boolean {
    return this.checkPassword(password);
  }
}

interface IPremiumUser {
  chageNickname(oldNick: string, newNick: string): void;
  changeEmail(oldEmail: string, newEmail: string): void;
}

class PremiumUser extends User implements IPremiumUser {
  constructor(nickname: string, email: string, password: string) {
    super(nickname, email, RoleUser.premium, password);
  }

  changeEmail(oldEmail: string, newEmail: string): void {
    if (oldEmail === this.getEmail()) this.email = newEmail;
  }

  chageNickname(oldNick: string, newNick: string): void {
    if (oldNick === this.nickname) this.nickname = newNick;
  }
}

interface IAdmin {
  addUser(user: User): void;
  removeUser(user: User): void;
  getAllUsers(): User[];
}

class Admin extends User implements IAdmin, IPremiumUser {
  private users: User[] = [];

  constructor(nickname: string, email: string, password: string) {
    super(nickname, email, RoleUser.admin, password);
  }

  addUser(user: User) {
    this.users.push(user);
    console.log(`${user.nickname} agregado por el admin`);
  }

  removeUser(user: User) {
    this.users = this.users.filter((u) => u.nickname !== user.nickname);
    console.log(`${user.nickname} eliminado por el admin`);
  }

  getAllUsers() {
    return this.users;
  }

  changeEmail(oldEmail: string, newEmail: string): void {
    if (oldEmail === this.getEmail()) this.email = newEmail;
    console.log(
      `Admin ${this.nickname} cambio su correo electronico a ${this.email}`
    );
  }

  chageNickname(oldNick: string, newNick: string): void {
    if (oldNick === this.nickname) this.nickname = newNick;
    console.log(`Admin ${oldNick} cambio su nickname a ${this.nickname}`);
  }
}

// Crear un administrador
const admin = new Admin("adminMaster", "admin@dominio.com", "1234");

// Crear un usuario premium
const premiumUser = new PremiumUser("hauro", "hauro@correo.com", "abcd");

// Autenticar usuario premium
if (premiumUser.authenticate("abcd")) {
  console.log("Autenticación exitosa para el usuario premium.");
  premiumUser.login();
} else {
  console.log("Contraseña incorrecta.");
}

// Agregar el usuario premium al sistema por el admin
admin.addUser(premiumUser);

// El admin ve todos los usuarios
console.log("Usuarios actuales:");
admin.getAllUsers().forEach((user) => console.log(user.getAllInfo()));

// El usuario premium cambia su nickname y su email
premiumUser.chageNickname("hauro", "hauroXD");
premiumUser.changeEmail("hauro@correo.com", "hauro@nuevo.com");

// Mostrar la información actualizada del usuario premium
console.log("\nInformación del usuario premium actualizada:");
console.log(premiumUser.getAllInfo());

// El admin elimina al usuario premium
admin.removeUser(premiumUser);

// Mostrar los usuarios restantes
console.log("\nUsuarios después de la eliminación:");
admin.getAllUsers().forEach((user) => console.log(user.getAllInfo()));

// Admin cambia sus propios datos
admin.chageNickname("adminMaster", "superAdmin");
admin.changeEmail("admin@dominio.com", "superadmin@dominio.com");
