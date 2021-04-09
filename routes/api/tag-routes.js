const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
  // find all tags
  // be sure to include its associated Product data
router.get('/', (req, res) => {
  Tag.findAll(
    {
      attributes: [
        'id', 
        'tag_name'
      ],
      include:[{
        model: Product,
        attributes: [
          'id', 
          'product_name', 
          'price', 
          'stock'
        ],
        include: [{ 
          model: Category, 
          attributes: [
            'id',
            'category_name' 
          ] 
        }],
        through: ProductTag, 
        as: 'tagged_products'
      }]
    })
    .then(tagData => { 
      res.status(200).json(tagData); 
    })
    .catch(err => { 
      console.log(err); res.status(500).json(err); 
    });
});

  // find a single tag by its `id`
  // be sure to include its associated Product data
  router.get('/:id', (req, res) => {
    Tag.findOne(
      {
        attributes: [
          'id', 
          'tag_name'
        ],
        where: { id: req.params.id },
        include:[{
          model: Product,
          attributes: [
            'id', 
            'product_name', 
            'price', 
            'stock'
          ],
          include: [{ 
            model: Category, 
            attributes: [
              'category_name', 
              'id'
            ] 
          }],
          through: ProductTag, 
          as: 'tagged_products'
        }]
      })
      .then(tagData =>{
        if (!tagData) { 
          res.status(404).json({ message: 'No tag found' }); 
          return; 
        }
        res.status(200).json(tagData);
      })
      .catch(err => { 
        console.log(err); res.status(500).json(err); 
      });
});

  // create a new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
  .then(tagData => { 
    res.status(200).json(tagData); 
  })
  .catch(err => { 
    console.log(err); 
    res.status(500).json(err); 
  });
});

  // update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body, { 
    where: { id: req.params.id } 
  })
  .then(tagData =>{
    if (!tagData) { 
      res.status(404).json({ message: 'No tag found' }); 
      return; 
    }
    res.status(200).json(tagData);
  })
  .catch(err => { 
    console.log(err); 
    res.status(500).json(err); 
  });
});


  // delete on tag by its `id` value
  router.delete('/:id', (req, res) => {
    Tag.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((tagData) => {
        if (!tagData) {
          res
            .status(404)
            .json({ message: "No tag found" });
          return;
        }
        res.json(tagData);
      })
      .catch((err) => {
        console.log((err) => {
          res.status(500).json(err);
        });
  });
});

module.exports = router;
