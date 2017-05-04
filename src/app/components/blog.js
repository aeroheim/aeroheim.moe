import React from 'react';
import AnimatedTransition from './animated-transition';
import styles from '../static/styles/components/blog.css';

const Blog = ({ match }) =>
{
    const transitionIns = 
    {
        revealPage: 
        {
            from: 0,
            to: 115,
            duration: 850,
            delay: 500,
            easing: 'easeExpOut'
        },
    }

    const transitionOuts = 
    {
        revealPage:
        {
            from: 115,
            to: 0,
            duration: 850,
            easing: 'easeExpOut'
        },
    }

    return (
        <AnimatedTransition transitionIns={transitionIns} transitionOuts={transitionOuts} show={match ? true : false}>
            {({ transitionValues }) => {

                const pageTransition = 
                {
                    clipPath: `polygon(-15% 0%, ${transitionValues['revealPage']}% 0%, ${-15 + transitionValues['revealPage']}% 100%, -30% 100%)`,
                };

                return (
                    <div className={styles.page} style={pageTransition}>
                        <div className={styles.background}>
                            <div className={styles.content}>
                            <h1>Blog</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at arcu at ipsum dapibus eleifend. Sed vitae hendrerit diam. Nam nec elementum arcu. Curabitur posuere magna at sapien vulputate, et lobortis neque sollicitudin. Ut sed consequat quam. Nunc condimentum lacus nibh, in venenatis nulla feugiat vitae. Sed dapibus pulvinar eros vitae fringilla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus nec tellus auctor, mollis purus eu, tincidunt dui. Phasellus mattis diam leo, a suscipit felis auctor tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas vel porta libero, sed dapibus augue. Ut nec arcu condimentum, sagittis erat nec, ultrices nibh. Fusce vitae metus massa. Nunc erat lectus, feugiat et ex ac, vehicula pretium urna.

Suspendisse mollis tempor sem. Sed facilisis tellus non ante placerat posuere. Sed tortor nisl, vulputate at quam at, lacinia tristique mi. Donec a leo non felis tincidunt interdum varius eu neque. Morbi scelerisque ullamcorper neque, ut viverra elit mattis quis. Aenean ornare, mauris vitae lacinia tristique, neque lectus laoreet libero, id ultricies libero tellus in massa. Nam scelerisque ultrices lacus eu porttitor. Phasellus maximus, urna ut blandit maximus, magna nibh efficitur libero, vitae consectetur est leo et lacus. Duis sollicitudin enim ornare viverra faucibus. Nunc id mauris egestas, sodales sem non, tristique mauris. Integer feugiat vulputate nisi, id euismod magna efficitur sed. Vestibulum blandit urna quis nulla consectetur, faucibus rutrum ligula maximus. Sed laoreet vel erat vel laoreet.

Vivamus ullamcorper sollicitudin purus vitae imperdiet. Fusce eu magna nec augue pretium placerat. In nec nulla a sem posuere blandit quis eget tellus. Maecenas massa ex, hendrerit id odio id, laoreet accumsan ante. Vivamus tortor dui, suscipit in suscipit eget, rutrum a dui. Aliquam erat volutpat. Proin vehicula nibh nec leo sollicitudin ultricies. Duis mauris arcu, rhoncus non eleifend et, rhoncus vitae diam. Etiam nec risus tellus. Nunc ut elit faucibus nibh scelerisque auctor. Etiam sapien lectus, hendrerit non elit eu, finibus dapibus massa.

Vestibulum in gravida risus. Suspendisse ut felis sit amet tortor porta aliquet id ut tellus. Nulla ante sapien, sodales in ante eget, rhoncus vehicula nibh. Ut finibus leo ut sem pellentesque, in mattis mauris laoreet. Nullam porttitor porta erat, id cursus leo laoreet dictum. Integer finibus imperdiet libero, eget interdum massa tristique non. Curabitur sed urna sit amet sapien ultrices rutrum. Nullam urna tellus, malesuada eu mi nec, varius elementum orci. Quisque semper purus vel neque tincidunt auctor. Curabitur tincidunt magna dui, ac tristique nunc molestie vitae. Pellentesque porttitor porta molestie. Nulla dignissim hendrerit purus, ut faucibus nulla placerat vel. Sed eu elit vitae mi aliquam aliquet. Nunc ut lacus at neque luctus accumsan nec id turpis.

Nam aliquam accumsan augue sit amet accumsan. In gravida congue leo et semper. Aliquam erat volutpat. Praesent tempor vel sem quis maximus. Vestibulum egestas lacinia dapibus. Pellentesque consectetur lobortis fermentum. Phasellus ornare velit sit amet lacus maximus, vitae malesuada lorem dignissim. Donec ultricies magna in ex auctor commodo. Mauris eu viverra ligula. Quisque tincidunt eu arcu tincidunt mattis. Morbi porttitor tincidunt eros mollis dictum. Donec euismod placerat massa quis pretium. Nulla et nulla condimentum, commodo ex vel, lobortis nulla.

Nunc vitae neque mauris. Curabitur vulputate sed lorem vel sollicitudin. Nullam vel sem lobortis dolor lacinia venenatis in auctor orci. Vivamus ullamcorper massa eu lorem efficitur consequat. Quisque arcu mi, lacinia quis dignissim vel, molestie ut ipsum. Quisque et eros mauris. Vivamus lacinia libero a risus congue porttitor. Duis rhoncus lectus lectus, eu scelerisque eros rhoncus nec. Cras turpis nibh, dictum in convallis sed, iaculis id tellus.

Suspendisse lectus metus, sollicitudin sit amet sodales commodo, porta vitae ligula. Aenean condimentum ipsum vitae lorem laoreet pretium. Ut venenatis libero a magna ornare, in dignissim elit cursus. Vestibulum ut faucibus ex. Vivamus maximus in leo vitae lacinia. Integer non nisl vel ante tristique euismod et eget libero. Nulla auctor lectus eu hendrerit semper. Donec felis felis, pretium in est interdum, dapibus egestas mauris. Proin sed ex laoreet, lobortis elit et, congue mi. Nunc semper ex sed tincidunt facilisis. Integer maximus placerat interdum. Maecenas egestas erat vel dignissim convallis. Praesent egestas turpis vel metus mollis, eu congue mi fermentum. Nullam pellentesque neque eu facilisis maximus.

Aenean finibus lectus diam, nec faucibus dolor convallis a. Donec cursus et risus at consequat. Donec ex arcu, fringilla id mattis interdum, sodales sit amet urna. Curabitur dui metus, dictum eu purus et, egestas gravida ligula. Maecenas mattis placerat mi id fringilla. Donec quis hendrerit tellus, id tempor erat. Sed vestibulum accumsan molestie. Suspendisse eleifend dolor at magna commodo, hendrerit condimentum magna eleifend. Nulla facilisi. Sed iaculis fermentum convallis. Aenean quis egestas tortor. Aliquam viverra non nulla a pretium.

Pellentesque sollicitudin est ante, vel pretium orci scelerisque quis. Vestibulum et blandit mi. Cras sapien nisl, aliquet sit amet libero ut, cursus pellentesque libero. Aenean luctus est eget maximus tincidunt. Ut pulvinar ligula vel nunc iaculis, sed bibendum libero pulvinar. Proin cursus semper dapibus. Vestibulum et elementum quam. Maecenas sit amet fermentum urna. Morbi eu blandit diam. Donec molestie magna ultrices, interdum orci at, luctus justo. Donec porttitor odio sit amet felis venenatis volutpat. Pellentesque ac est at lorem dictum laoreet. Sed rhoncus id nibh eget euismod. Quisque et sodales lorem. Aenean viverra pharetra pharetra.

Aliquam luctus non leo nec venenatis. Nam nec velit augue. Maecenas lacus neque, feugiat id felis vitae, vulputate tristique orci. Donec ut eros nec nisl laoreet hendrerit. Etiam ultrices sit amet lectus dapibus fringilla. In mattis elit ac elit scelerisque, eget lobortis velit dignissim. Morbi vel velit vel felis placerat luctus vel ut lorem. Nulla finibus tempus urna, in vulputate purus congue eu. Aliquam faucibus semper orci, vitae ultricies justo finibus non. In placerat at nibh nec efficitur. Duis vitae metus ex. Sed luctus mollis purus ac elementum.
                            </p>
                            </div>
                        </div>
                    </div>
                );
            }}
        </AnimatedTransition>
    );
}

export default Blog;