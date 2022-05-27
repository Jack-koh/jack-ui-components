const fs = require('fs');
const path = require('path');

const BUILD_PATH = path.join(__dirname, '/build');
const DIST_PATH = path.join(__dirname, '/dist');

// const removeFile = (target) => {
//   fs.access(target, fs.constants.F_OK, (err) => {
//     if (err) return console.log(err);
//     fs.unlink(target, (err) => {
//       if (err) throw err;
//       console.log(`${target} 를 정상적으로 삭제했습니다`);
//     });
//   });
// };

const prepareAssets = (config) => {
  fs.mkdirSync(config.path.PREV, (err) => {
    if (err) return console.log(err);
  });

  fs.readdirSync('./build/static/media').forEach((file) => {
    fs.renameSync(path.join(config.path.PREV, file), path.join(config.path.DEST, file), (err) => {
      if (err) throw err;
      console.log('이미지 파일 이동 완료 ------------------');
    });
  });
};

const prepareCss = (config) => {
  fs.readdirSync(config.path.PREV).forEach((file) => {
    const map_file = file.includes('map'); // css map 파일
    if (map_file) {
      fs.renameSync(path.join(config.path.PREV, file), path.join(config.path.DEST, file), (err) => {
        if (err) throw err;
        console.log('css map 파일 이동 완료 ------------------');
      });
    }

    if (!map_file) {
      // 1) 맵 파일이 아닐경우 css 파일명을 config.CSS_FILE_NAME으로 변경
      // 2) css 파일 내 '/static/media' 문자열을 './assets' 으로 치환
      // 3) 변경된 css파일을 목적 경로로 이동
      const target = path.join(config.path.PREV, file);
      const css = fs.readFileSync(target, 'utf8');
      const modified = css.replaceAll('/static/media', './assets');

      fs.writeFileSync(target, modified, (err) => {
        if (err) throw err;
        console.log('css asset 경로 변경 완료 ------------------');
      });

      //
      fs.renameSync(target, path.join(config.path.DEST, config.CSS_FILE_NAME), (err) => {
        if (err) throw err;
        console.log('css 파일 이동 완료 ------------------');
      });
    }
  });
};

prepareAssets({
  path: {
    PREV: path.join(BUILD_PATH, '/static/media/'),
    DEST: path.join(DIST_PATH, '/assets'), // bundle된 이미지가 이동할 dir
  },
});

prepareCss({
  CSS_FILE_NAME: 'jack.ui.components.css',
  path: {
    PREV: path.join(BUILD_PATH, '/build/static/css/'),
    DEST: DIST_PATH, // bundle된 css가 이동할 dir
  },
});
