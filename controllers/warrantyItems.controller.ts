import { Request, Response } from 'express';
import {
  searchWarrantyItems,
  getWarrantyItembySerialNumber,
  CreateWarrantyItem,
  updateWarrantyItemPartial,
  deleteWarrantyItem,
} from '../models/warranty_items.model';




/**
 * @desc    Search warranty items by search term
 * @route   GET /api/warranties/search?term=xxx
 */
export const searchWarranties = async (req: Request, res: Response): Promise<void> => {
  try {
    const searchTerm = req.query.term as string;

    if (!searchTerm || !searchTerm.trim()) {
      res.status(400).json({ success: false, message: 'Search term query parameter is required.' });
      return;
    }

    const items = await searchWarrantyItems(searchTerm);
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    console.error('Error searching warranty items:', error);
    res.status(500).json({ success: false, message: 'Server error while searching warranty items.' });
  }
};

/**
 * @desc    Get single warranty item by serial number
 * @route   GET /api/warranties/serial/:serialNumber
 */
export const getBySerialNumber = async (req: Request, res: Response): Promise<void> => {
  try {
    const { serialNumber} = req.params;

    if (!serialNumber) {
      res.status(400).json({ success: false, message: 'Serial number is required.' });
      return;
    }

    const item = await getWarrantyItembySerialNumber(serialNumber as string);

    if (!item) {
      res.status(404).json({ success: false, message: `Warranty item with serial number '${serialNumber}' not found.` });
      return;
    }

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error('Error fetching warranty item by serial number:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching warranty item.' });
  }
};

/**
 * @desc    Create a new warranty item
 * @route   POST /api/warranties
 */
export const createWarranty = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      serial_number,
      label_id,
      product_id,
      branch_id,
      customer_id,
      warranty_months,
      warranty_start_date,
      warranty_end_date,
    } = req.body;

    // Required fields validation
    if (
      !serial_number ||
      !label_id ||
      !product_id ||
      !branch_id ||
      !customer_id ||
      warranty_months === undefined ||
      !warranty_start_date ||
      !warranty_end_date
    ) {
      res.status(400).json({ success: false, message: 'Please provide all required fields.' });
      return;
    }

    const newItem = await CreateWarrantyItem(
      serial_number,
      label_id,
      Number(product_id),
      Number(branch_id),
      Number(customer_id),
      Number(warranty_months),
      new Date(warranty_start_date),
      new Date(warranty_end_date)
    );

    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    console.error('Error creating warranty item:', error);
    res.status(500).json({ success: false, message: 'Server error while creating warranty item.' });
  }
};

/**
 * @desc    Partially update a warranty item by ID
 * @route   PATCH /api/warranties/:id
 */
export const updateWarranty = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const fieldsToUpdate = req.body;

    if (isNaN(id)) {
      res.status(400).json({ success: false, message: 'Invalid warranty ID provided.' });
      return;
    }

    if (!fieldsToUpdate || Object.keys(fieldsToUpdate).length === 0) {
      res.status(400).json({ success: false, message: 'No fields provided for update.' });
      return;
    }

    const updatedItem = await updateWarrantyItemPartial(id, fieldsToUpdate);

    if (!updatedItem) {
      res.status(404).json({ success: false, message: `Warranty item with ID ${id} not found.` });
      return;
    }

    res.status(200).json({ success: true, data: updatedItem });
  } catch (error) {
    console.error('Error updating warranty item:', error);
    res.status(500).json({ success: false, message: 'Server error while updating warranty item.' });
  }
};





/**
 * @desc    Delete a warranty item by ID
 * @route   DELETE /api/warranties/:id
 */
export const removeWarranty = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) {
      res.status(400).json({ success: false, message: 'Invalid warranty ID provided.' });
      return;
    }

    const deletedItem = await deleteWarrantyItem(id);

    if (!deletedItem) {
      res.status(404).json({ success: false, message: `Warranty item with ID ${id} not found.` });
      return;
    }

    res.status(200).json({ success: true, message: 'Warranty item deleted successfully.', data: deletedItem });
  } catch (error) {
    console.error('Error deleting warranty item:', error);
    res.status(500).json({ success: false, message: 'Server error while deleting warranty item.' });
  }
};