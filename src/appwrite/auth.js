import {Client, Account, ID} from "appwrite"
import conf from "../conf/conf";


export class AppwriteService {
     client = new Client();
     account;
     constructor() {
        this.client
             .setEndpoint(conf.appwriteUrl)
             .setProject(conf.appwriteProjectId);
         this.account = new Account(this.client);
     }

     async createAccount({email, password}) {
        try {
            const userCreated = await this.account.create(ID.unique(), email, password )
            console.log("appwrite create account success");
            if(userCreated) {
                return this.login({email, password});
            } else {
                return userCreated;
            }
        } catch (error) {
            console.log("appwrite create account error", error);
        }
     }

     async login({email, password}) {
        try {
             return await this.account.createEmailPasswordSession(email, password);
         } catch (error) {
             console.log("appwrite login error", error);
         }
     }

     async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("appwrite logout error", error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("appwrite getCurrentUser error", error);
        }
    }

}

const authService = new AppwriteService();

export default authService;