import {MongoClient} from "mongodb";

//api/new-meetup
export default async function handler(req, res) {

    //요청확인.
    if (req.method === 'POST') {
        const data = req.body;


        const {title, image, address, description} = data;
        const uri = "mongodb+srv://jhjimess_db_user:XUBRhmVJSZ7w5DJY@cluster0.dr7andv.mongodb.net/meetups?appName=Cluster0";
        const client = new MongoClient(uri);
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        await meetupsCollection.insertOne(data);

        await client.close();

        res.status(201).json({message: '등록이 완료되었습니다.'});
    }
}