export const get = async (req) => {
    try {
        return {
        asdfs: "Asdf"
        };
    }catch (e) { 
        console.error(e);
        return e;
    }
}