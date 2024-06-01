import { mkdir, readFile, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export const POST = async (req: NextRequest, res: NextResponse) => {
  let file: File | null;
  try {
    const data = await req.formData();
    file = data.get('file') as unknown as File;
  } catch (e: any) {
    return NextResponse.json(
      { msg: "Error fetching the data!" },
      { status: 400 }
    );
  }

  if (!file)
    return NextResponse.json({ msg: "No file uploaded!" }, { status: 400 });

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const directory = join(process.cwd(), 'temp');
    const path = join(directory, file.name);
    
    await mkdir(directory, { recursive: true });
    await writeFile(path, buffer);
    const fileContent = await readFile(path, 'utf-8');

    return NextResponse.json({ success: fileContent }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { msg: "Error while saving data!" },
      { status: 400 }
    );
  }
};
