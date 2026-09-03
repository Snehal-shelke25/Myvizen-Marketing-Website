import os
import zipfile

def create_zip():
    source_dir = r"C:\Users\sneha\Downloads\Myvizen-Marketing-Website"
    output_zip = r"C:\Users\sneha\Downloads\Myvizen-Marketing-Website.zip"
    
    with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as ziph:
        for root, dirs, files in os.walk(source_dir):
            if 'node_modules' in dirs:
                dirs.remove('node_modules')
            if 'dist' in dirs:
                dirs.remove('dist')
            if '.git' in dirs:
                dirs.remove('.git')
                
            for file in files:
                if file.endswith('.zip'):
                    continue
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, os.path.dirname(source_dir))
                ziph.write(file_path, arcname)
    print(f"Created ZIP archive at: {output_zip}")

if __name__ == "__main__":
    create_zip()
