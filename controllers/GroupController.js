const Group = require('../models/Group');

exports.createGroup = async(req, res) => {
    try{
        const{GroupName, Description, Keywords} = req.body;
        const group = new Group({
            GroupName,
            Description,
            Keywords : Keywords.tags,
            CreatedAt : new Date(),
            UpdatedAt : new Date()
        });
        await group.save();
        res.status(201).json(group);
    }catch(err){
        res.status(400).json({ error: err });
    }
};

exports.getAllGroups = async(req, res) => {
    try{
        const groups = await Group.find();
        res.status(200).json(groups);
    }catch(err){
        res.status(400).json({ error: err.message });
    }
};

exports.getGroupByName = async(req, res) => {
    try{
        const { groupName } = await Group.findByName(req.params.groupName);
        if(!groupName) return res.status(404).json({ message: 'Group not found' });
        res.status(200).json(groupName);
    }catch(err){
        res.status(400).json({ error: err });
    }
};

exports.updateGroup = async(req, res) => {
    try{
        const updatedGroup = await findByIdAndUpdated(req.params.GroupName, req.Description, {new :true} );
        if(!updatedGroup) return res.status(404).json({ message:'Group not found in the database' });
        res.status(200).json(updatedGroup);
    }
    catch(err){
        res.status(400).json({ error: err.message });
    }
};

exports.deleteGroup = async(req, res) => {
    try{
        const group = await GroupByIdAndDelete(req.params.groupId);
        if(!group) return res.status(404).json({ message: 'Group not found' });
        res.status(204).send();
    }
    catch(err){
        res.status(404).json({error: err.message});
    }
};

