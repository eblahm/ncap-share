
collections.files = new FS.Collection("uploads", {
	stores: [new FS.Store.FileSystem("uploads", {path: "../public"})]
});