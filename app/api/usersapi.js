findOne: {
    auth: false,
        handler: async function(request, h) {
        const candidate = await Users.findOne({ _id: request.params.id });
        return candidate;
    }
}