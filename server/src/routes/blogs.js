import { Router } from 'express';
import Table from '../table';
let router = Router();

let iHateThisLab = new Table('blogs');

router.get('/', async (req, res) => {
    let blogs = await iHateThisLab.getAll();
    res.json(blogs);
});

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    console.log(id);
    let blogs = await iHateThisLab.getOne(id);
    res.json(blogs);
});

router.post('/', async (req, res) => {
    let body = req.body
    console.log(req.body);
    let id = await iHateThisLab.insert(body);
    res.json(id);
})

router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    let result = await iHateThisLab.delete(id);
    console.log(result);
    res.json(result);
})
export default router;