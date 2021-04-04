export class Photo {
    static async getBase64(file: File):Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }

    static async deserializeFromFile(file: File):Promise<string | null> {
        try {
            return this.getBase64(file)
        }catch (e) {
            console.error(e)
            return null
        }
    }

}
