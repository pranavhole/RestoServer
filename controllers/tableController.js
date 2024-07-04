const User = require('../models/User');
const Table = require('../models/Tables');

exports.createTable = async (req, res) => {
  const { sector, shortName } = req.body;

  try {
   
    const owner = await User.findById(req.id);
    if (!owner) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newTable = new Table({
        section: sector,
      shortName: shortName,
      Restorent: req.user._id,
    });

    // Save the table
    const savedTable = await newTable.save();
    owner.tables = owner.tables ? [...owner.tables, savedTable._id] : [savedTable._id];
    await owner.save();
    res.status(201).json({ message: 'Table created successfully', table: newTable });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateTableWithNumbers = async (req, res) => {
    const { tableId, table_no } = req.body;
  
    try {
      const owner = await User.findById(req.id);
      if (!owner) {
        return res.status(404).json({ message: 'User not found' });
      }

      const table = await Table.findById(tableId);
      if (!table) {
        return res.status(404).json({ message: 'Table section not found' });
      }

      const tableNumbers = [];
      for (let i = 1; i <= table_no; i++) {
        tableNumbers.push(`${table.shortName}${i}`);
      }
      table.Table_no = tableNumbers;
      await table.save();
  
      res.status(200).json({ message: 'Table numbers updated successfully', table });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.getTables = async (req, res) => {
    try {
      const owner = await User.findById(req.id).populate('tables');
      if (!owner) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ tables: owner.tables });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.getTableById = async (req, res) => {
    const { tableId } = req.params;
  
    try {
      // Find the table by ID and populate owner information
      const table = await Table.findById(tableId);
      if (!table) {
        return res.status(404).json({ message: 'Table not found' });
      }
  
      res.status(200).json({ table });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };