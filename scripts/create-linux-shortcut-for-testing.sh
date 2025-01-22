current_dir=$(pwd)
applications_dir=~/.local/share/applications

cd $applications_dir

echo "[Desktop Entry]
Type=Application
Name=PageScribe
Exec=$current_dir/out/PageScribe-linux-x64/PageScribe %U" > PageScribe.desktop

cat $applications_dir/PageScribe.desktop
