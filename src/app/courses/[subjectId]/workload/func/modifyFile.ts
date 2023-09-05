const modifyFile = (file: undefined | null | string | FileList | File) => {
    if (file instanceof FileList) {
        return file[0]
    }

    return file
}

export default modifyFile